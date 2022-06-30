// const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin");
import ModuleScopePlugin from "react-dev-utils/ModuleScopePlugin";

export default function override(config, _environment) {
  config.resolve.plugins = config.resolve.plugins.filter(
    (plugin) => !(plugin instanceof ModuleScopePlugin)
  );

  return config;
}

// config module
