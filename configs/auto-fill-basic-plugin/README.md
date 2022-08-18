# Auto-Fill Basic Plugin

This demo uses the default config, and merely adds a simple auto-fill script for vehicle pricing for the personal-auto policy.

At first, the auto-fill script is invoked via API call on new business. Notice that in the `PolicyCreateRequest`, the top-level `autofill` property is set to `["internal"]`.

