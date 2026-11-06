# Libraries: one per concern

Principle for every profile: keep the repo's existing UI library, never migrate frameworks, never add a second library for the same concern. The agent never installs a library. If a need is not covered here, stop, report it, and wait for the user to add the library to this file first.

The profile name comes from `scripts/detect-stack.mjs` (`profile` field). Pick the matching section.

## Profile `react-mantine` (the standard)

| Concern | Use | Banned |
|---|---|---|
| Components and styling | Mantine only | shadcn/ui, Radix, Tailwind (and `tailwind-merge`, `class-variance-authority`), any other component library |
| Charts | `@mantine/charts` only | direct `recharts` imports, Chart.js, ApexCharts, ECharts, Victory, Nivo, Highcharts, Plotly, visx |
| Icons | Phosphor (`@phosphor-icons/react`), weight `duotone`, set once through `IconContext.Provider` or a shared wrapper | Lucide, Tabler, react-icons, Heroicons, Font Awesome, MUI icons, any other set |
| Motion | plain CSS transitions, 200ms or less | framer-motion, motion, react-spring, GSAP, anime.js, Lottie, react-transition-group, any animation library |
| Form fields | one shared floating-label component built on Mantine inputs | raw Mantine inputs or raw `<input>` outside that component |

`recharts` may stay in `package.json` as the peer dependency that `@mantine/charts` requires. Only direct imports of it are violations.

## Profile `react-other-ui`

Keep that library as the single component library. Apply the palette, type, shape and shadows through its theme mechanism (MUI `createTheme`, Chakra `extendTheme`, Ant Design `ConfigProvider`, and so on). Icons are duotone from one set. Motion is plain CSS. Report that the repo does not use Mantine. The scanner treats the library with the most imports as the primary one and flags imports from any other component-library family. Tailwind is banned beside a component library.

## Profile `other-framework` (Vue, Svelte, Astro, React without a UI library, others)

Apply the palette and rules through CSS custom properties generated from `assets/insighted-tokens.json`. Keep the framework's existing component library, if any. Icons duotone from the Phosphor package for that framework. Motion is plain CSS.

## Profile `server-rendered` (templates, plain HTML, plain CSS)

Generate one CSS variables file from the tokens and reference it from the shared layout. No new frontend dependencies. Icons: Phosphor duotone via its web or SVG package only if the repo already ships it; otherwise list the gap in the report instead of installing anything.

## Machine-readable lists

`scripts/scan-ui-violations.mjs` reads the JSON block below. This block is the single source of truth: change a library here and the scanner follows. Matching rule: an entry matches a package when the name is equal or the package starts with `entry/`; an entry ending in `*` matches any package that starts with the text before the `*`.

```json banned-libraries
{
  "icons": {
    "approved": ["@phosphor-icons/react", "@phosphor-icons/vue", "@phosphor-icons/web", "@phosphor-icons/core", "@phosphor-icons/webcomponents", "phosphor-react", "phosphor-vue", "phosphor-svelte"],
    "banned": ["lucide*", "@lucide", "@tabler/icons*", "react-icons", "@heroicons", "heroicons", "@fortawesome", "fontawesome", "font-awesome", "@mui/icons-material", "@material-ui/icons", "bootstrap-icons", "feather-icons", "react-feather", "@radix-ui/react-icons", "ionicons", "remixicon", "@remixicon", "@iconify", "@iconify-icons", "material-icons", "@mdi", "@carbon/icons", "@primer/octicons", "@phosphor-icons/react-native"]
  },
  "charts": {
    "approved": ["@mantine/charts"],
    "profiles": ["react-mantine"],
    "banned": ["recharts", "chart.js", "react-chartjs-2", "apexcharts", "react-apexcharts", "echarts", "echarts-for-react", "victory", "@nivo", "highcharts", "highcharts-react-official", "plotly.js", "react-plotly.js", "@visx", "chartist"],
    "alsoDetect": ["d3"],
    "peerExemptions": { "recharts": "@mantine/charts" }
  },
  "motion": {
    "banned": ["framer-motion", "motion", "@react-spring", "react-spring", "gsap", "animejs", "anime", "@motionone", "motion-one", "popmotion", "lottie-react", "lottie-web", "react-lottie", "@lottiefiles", "@formkit/auto-animate", "react-transition-group", "animate.css", "@vueuse/motion", "svelte-motion"]
  },
  "loaders": {
    "banned": ["react-loading-skeleton", "react-content-loader", "vue-content-loader", "vue-loading-skeleton", "ngx-skeleton-loader", "svelte-skeleton", "react-skeleton-loader"]
  },
  "components": {
    "profileBanned": {
      "react-mantine": ["@shadcn", "shadcn-ui", "shadcn", "@radix-ui", "radix-ui", "class-variance-authority", "tailwind-merge"]
    },
    "uiFamilies": {
      "mantine": ["@mantine"],
      "mui": ["@mui", "@material-ui"],
      "chakra": ["@chakra-ui"],
      "antd": ["antd", "@ant-design"],
      "shadcn-radix": ["@radix-ui", "radix-ui", "@shadcn", "shadcn-ui", "class-variance-authority"],
      "bootstrap": ["bootstrap", "react-bootstrap", "bootstrap-vue", "bootstrap-vue-next"],
      "prime": ["primereact", "primevue", "primeng"],
      "vuetify": ["vuetify"],
      "element": ["element-plus", "element-ui"],
      "headlessui": ["@headlessui"],
      "heroui": ["@nextui-org", "@heroui"],
      "blueprint": ["@blueprintjs"],
      "fluent": ["@fluentui"],
      "semantic": ["semantic-ui-react"],
      "carbon": ["@carbon"],
      "daisyui": ["daisyui"],
      "flowbite": ["flowbite", "flowbite-react"],
      "quasar": ["quasar"],
      "skeleton-ui": ["@skeletonlabs"],
      "bits-ui": ["bits-ui"],
      "naive": ["naive-ui"]
    },
    "utilityCss": ["tailwindcss", "@tailwindcss", "tailwindcss-animate", "tailwind-merge"]
  }
}
```
