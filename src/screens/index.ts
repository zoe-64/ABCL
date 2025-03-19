import { bcModSDK } from "../core/utils";
import { ModScreen } from "../types/types";

export const initScreens = (screens: ModScreen[]) => {
  bcModSDK.hookFunction("TextLoad", 5, (args, next) => {
    if (screens.some((screen) => screen.module === CurrentModule && screen.id === CurrentScreen)) {
      return;
    }

    return next(args);
  });

  screens.forEach((screen) => {
    (<any>window)[`${screen.id}Background`] = "Sheet";

    const { KeyUp, Click, ...rest } = screen.functions;

    const injectedScreenFunctions = {
      ...rest,
      KeyUp: (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          (<any>window)[`${screen.id}Exit`]();
        }

        KeyUp?.(event);
      },
      Click: (event: MouseEvent) => {
        if (MouseIn(1815, 75, 90, 90)) {
          (<any>window)[`${screen.id}Exit`]();
        }
        Click?.(event);
      },
    };

    (<any>window)[`${screen.id}ScreenFunctions`] = injectedScreenFunctions;

    Object.entries(injectedScreenFunctions).forEach(([key, value]) => {
      (<any>window)[`${screen.id}${key}`] = value;
    });
  });
};
