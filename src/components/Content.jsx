export default function ContentDisplay({ province, category }) {
  const content = {
    health: {
      title: "Health Statistics",
      component: () => <div>Health data visualization for {province}</div>,
    },
    demographic: {
      title: "Demographics",
      component: () => <div>Demographic data visualization for {province}</div>,
    },
    labor: {
      title: "Labor Statistics",
      component: () => <div>Labor data visualization for {province}</div>,
    },
  };

  const currentContent = content[category];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        {currentContent.title} - {province}
      </h2>
      <div className="bg-white rounded-lg shadow p-6">
        {currentContent.component()}
      </div>
    </div>
  );
}
