// Tabs is a generic tab component.
export default function Tabs({ tabs, selectedTab, setSelectedTab }) {
  return (
    <div role="tablist" className="tabs tabs-boxed">
      {Object.values(tabs).map((tabInfo) => {
        return (
          <a
            key={tabInfo.id}
            role="tab"
            className={selectedTab === tabInfo.id ? "tab tab-active" : "tab"}
            onClick={() => setSelectedTab(tabInfo.id)}
          >
            {tabInfo.label}
          </a>
        );
      })}
    </div>
  );
}
