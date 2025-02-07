export default function ContentDisplay({ province, category }) {
  const content = {
    demographic: {
      title: "Demographics",
      component: () => <div>Demographic data visualization for {province}</div>,
    },
    health: {
      title: "Health Statistics",
      component: () => <div>Health data visualization for {province}</div>,
    },
    education: {
      title: "Education Statistics",
      component: () => <div>Education data visualization for {province}</div>,
    },
    housing: {
      title: "Housing Statistics",
      component: () => <div>Housing data visualization for {province}</div>,
    },
    labor: {
      title: "Labor Statistics",
      component: () => <div>Labor data visualization for {province}</div>,
    },
    language: {
      title: "Language Statistics",
      component: () => <div>Language data visualization for {province}</div>,
    },
    community: {
      title: "Community Statistics",
      component: () => <div>Community data visualization for {province}</div>,
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
