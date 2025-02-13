
import { createSystem, defaultConfig } from "@chakra-ui/react";

const system = createSystem(defaultConfig, {
    theme: {
      tokens: {
        colors: {
            "barber.900": { value: "#12131b" },
            "barber.400": { value: "#1b1c29" },
            "barber.100": { value: "#c6c6c6" },
            "button.cta": { value: "#fba931" },
            "button.default": { value: "#FFF" },
            "button.gray": { value: "#DFDFDF" },
            "button.danger": { value: "#FF4040" },
            "orange.900": { value: "#fba931" },
        }
      },
    },
  });

  export { system };