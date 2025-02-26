// data/tabs.ts

export type Tab = {
    title: string;
    value: string;
  };
  
  export const defaultTabs: Tab[] = [
    { title: "All", value: "all" },
    { title: "อสม", value: "osm" },
    { title: "นักบริบาล", value: "caregiver" },
  ];
  