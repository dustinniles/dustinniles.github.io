export default function Home() {
  const portfolioItems = [
    { id: 1, title: "Project One", description: "Photography project" },
    { id: 2, title: "Project Two", description: "Design work" },
    { id: 3, title: "Project Three", description: "Creative direction" },
    { id: 4, title: "Project Four", description: "Photography series" },
    { id: 5, title: "Project Five", description: "Personal work" },
    { id: 6, title: "Project Six", description: "Client project" },
  ];

  return (
    <div className="p-12">
      <div className="grid grid-cols-1 gap-8">
        {portfolioItems.map((item) => (
          <div key={item.id} className="group cursor-pointer">
            <div className="aspect-[4/3] bg-gray-100 mb-3 overflow-hidden">
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                {item.title}
              </div>
            </div>
            <h3 className="text-sm font-light text-gray-900 mb-1">{item.title}</h3>
            <p className="text-xs font-light text-gray-500">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
