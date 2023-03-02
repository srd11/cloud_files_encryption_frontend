import { create_folder } from "@/api/create-folder";
import { FileRes, GetFilesRes, get_folders } from "@/api/get-folders";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Showcase = () => {
  const [files, setFiles] = useState<FileRes[]>([]);
  const [current_company_index, setccI] = useState(0);
  const [c, setc] = useState(false);
  const router = useRouter();
  let { path } = router.query;

  const [name_input, set_name_input] = useState("");

  const create_dir = () => {
    create_folder(path + "/" + name_input);
  };
  useEffect(() => {
    let constructed_path: string = "/";
    const path_array = path as string[];
    if (path_array) constructed_path = path_array.join("/");
    get_folders(constructed_path).then((e) => {
      setFiles(e.data.payload);
    });
  }, [path]);
  return (
    <div className="pt-32">
      <div>
        <input
          type="text"
          placeholder="Name"
          value={name_input}
          onChange={(e) => set_name_input(e.target.value)}
        />
        <button className="bg-green-700">Create file</button>
        <button onClick={create_dir}>Create folder</button>
      </div>
      <div>
        {files?.map((e, i) => {
          return (
            <div
              key={e.name}
              className="text-white bg-gray-900 p-10 inline-flex flex-col rounded-lg m-3"
              onClick={() => {
                let o_path = path as string;
                if (Array.isArray(path)) {
                  o_path = path.join("/");
                }
                router.push(o_path + "/" + e.name);
              }}
            >
              <img src="" alt="here is img"></img>
              <p className="cursor-pointer">NAME: {e.name}</p>
              <p>Domain: {e.isDir}</p>
              <button></button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Showcase;
