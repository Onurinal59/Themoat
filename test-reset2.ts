import { INITIAL_PRESET_DOSSIERS_TR, getInitialPresetDossiers } from "./src/data/companyAuditData";

console.log(INITIAL_PRESET_DOSSIERS_TR[0].id);

// simulate user modifying it:
// wait, the user DOES NOT modify it.
const presets = getInitialPresetDossiers(false);
console.log(presets.length);
