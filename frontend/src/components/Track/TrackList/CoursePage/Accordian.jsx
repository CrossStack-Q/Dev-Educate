import { useState, useEffect } from "react";

function Accordion({subtopic_id}) {
    const [openIndex, setOpenIndex] = useState(null);
    const [sections, setSections] = useState([]);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/courseindex?subtopic_id=${subtopic_id}`);
            if (!response.ok) {
                throw new Error("Failed to fetch sections");
            }
            const data = await response.json();
            setSections(data);
        };

        fetchData();
    }, [subtopic_id]);



    return (
        <div className="">
            {sections.map((item, index) => (
                <div key={item.id} className="relative pt-14 pb-6 border-b-2 border-zinc-800">
                    <div
                        className="flex items-center justify-between py-4 cursor-pointer"
                        onClick={() => toggleAccordion(index)}
                    >
                        <div className="flex items-center space-x-4">
                            <span className="px-4 py-2 w-36 text-white md:text-xl text-base rounded-full bg-[#5C76FF]">
                                Section{" "}{index}
                            </span>
                            <h3 className="md:text-3xl text-lg">{item.name}</h3>
                        </div>
                        <button className="md:text-4xl text-lg">
                            {openIndex === index ? "−" : "+"}
                        </button>
                    </div>
                    <div
                        className={`transition-all duration-100 ease-in-out overflow-hidden ${openIndex === index ? "max-h-screen relative" : "max-h-0 absolute"
                            }`}
                        style={{ top: '100%', left: 0, width: '100%' }}
                    >
                        <div className="py-6">
                            {item.content?.length > 0 ? ( 
                                <ul className="list-disc ml-6 space-y-2 text-xl">
                                    {item.content.map((content) => (
                                        <li key={content.id}>{content.title}</li> 
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-xl">No additional details available.</p>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Accordion;


