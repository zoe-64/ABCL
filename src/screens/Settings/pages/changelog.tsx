import { h, JSX } from "preact";
import { useEffect, useState } from "preact/hooks";
import { getDirectoryContents, GitHubFileItem } from "src/core/utils";
import styled from "styled-components";

interface ChangelogEntry {
  title: string;
  content: string;
}

// Utility function to fetch contents of each file
async function fetchChangelogs(dirUrl: string): Promise<ChangelogEntry[]> {
  const directoryItems: GitHubFileItem[] = await getDirectoryContents(dirUrl);

  const fileItems = directoryItems.filter(item => item.type === "file" && item.download_url);

  const entries = await Promise.all(
    fileItems.map(async file => {
      const title = file.name.replace(/\.[^/.]+$/, "");

      const res = await fetch(file.download_url!);
      const content = await res.text();

      return { title, content };
    }),
  );

  return entries;
}
export function Changelog({ setPage }: { setPage: (page: string) => void }): h.JSX.Element {
  const [changelogs, setChangelogs] = useState<ChangelogEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchChangelogs("https://github.com/zoe-64/ABCL/src/changelog")
      .then(data => {
        setChangelogs(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch path contents:", err);
        setError("Failed to load changelogs.");
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <button onClick={() => setPage("menu")} className="ABCL-exit-button">
        Back
      </button>

      {loading && <p>Loading changelogs...</p>}
      {error && <p>{error}</p>}

      <div className="changelog-list">
        {changelogs.map(entry => (
          <ChangeLogVersion key={entry.title} className="changelog-entry">
            <h2>{entry.title}</h2>
            <pre>{entry.content}</pre>
          </ChangeLogVersion>
        ))}
      </div>
    </div>
  );
}

const ChangeLogVersion = styled.div<JSX.IntrinsicElements["div"]>`
  font-weight: bold;
  margin-top: 1em;
  margin-bottom: 0.5em;
  > h2 {
    font-size: 1.5em;
    margin-bottom: 0.5em;
  }
  > pre {
    font-family: monospace;
    background-color: var(--abcl-element);
    padding: 0.5em;
    border-radius: 0.3em;
    white-space: pre-wrap;
  }
`;
