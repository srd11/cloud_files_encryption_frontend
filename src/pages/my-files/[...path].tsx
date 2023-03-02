import { create_folder } from "@/api/create-folder";
import { FileRes, GetFilesRes, get_folders } from "@/api/get-folders";
import { decrypt, encrypt } from "@/encryption/tools";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Model from "./components/Model";

const Showcase = () => {
  const [files, setFiles] = useState<FileRes[]>([]);
  const router = useRouter();
  let { path } = router.query;

  const [name_input, set_name_input] = useState("");
  const [model_active, set_modal_active] = useState(false);

  const create_dir = () => {
    const new_path = path as string[];
    create_folder(new_path.join("/") + "/" + encrypt(name_input));
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
      {model_active && (
        <Model
          fileName={name_input}
          path={(path as string[]).join("/")}
          onClose={() => set_modal_active(false)}
        ></Model>
      )}
      <div>
        <input
          type="text"
          placeholder="Name"
          value={name_input}
          onChange={(e) => set_name_input(e.target.value)}
        />
        <button className="bg-green-700" onClick={() => set_modal_active(true)}>
          Create file
        </button>
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
              <p className="cursor-pointer">{decrypt(e.name)}</p>
              <p>Dir: {e.isDir}</p>
              <button></button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Showcase;
