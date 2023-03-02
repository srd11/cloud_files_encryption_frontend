import { create_folder } from "@/api/create-folder";
import { FileRes, GetFilesRes, get_folders } from "@/api/get-folders";
import { upload_txt_file } from "@/api/upload-file";
import { decrypt, LOCAL_KEY } from "@/encryption/tools";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Model from "./components/Model";

const MyFiles = () => {
  const [files, setFiles] = useState<FileRes[]>([]);
  const router = useRouter();
  let { path } = router.query;
  const [name_input, set_name_input] = useState("");
  const [key_input, set_key_input] = useState("");

  const [model_active, set_modal_active] = useState(false);
  useEffect(() => {
    get_folders("/").then((e) => {
      setFiles(e.data.payload);
    });
  }, []);

  const create_dir = () => {
    upload_txt_file("/max", "kekekeke", "hmm.txt");
    create_folder(name_input);
  };
  return (
    <div className="pt-32">
      {model_active && (
        <Model
          fileName={name_input}
          path={"/"}
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
        <button
          className="bg-green-700 p-3 rounded-sm"
          onClick={() => set_modal_active(true)}
        >
          Create file
        </button>
        <button onClick={create_dir}>Create folder</button>
      </div>
      <div>
        <input
          type="password"
          placeholder="Key"
          value={key_input}
          onChange={(e) => set_key_input(e.target.value)}
        />
        <button onClick={() => localStorage.setItem(LOCAL_KEY, key_input)}>
          Set key
        </button>
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
                router.push("/my-files/" + e.name);
              }}
            >
              <p className="cursor-pointer">{decrypt(e.name)}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default MyFiles;
