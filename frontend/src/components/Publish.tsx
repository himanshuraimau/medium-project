import axios from "axios";
import { AppBar } from "./AppBar";
import { BACKEND_URL } from "../config";
import { useState } from "react";
import { ChangeEvent } from 'react';
import { useNavigate } from "react-router-dom";
export const Publish = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate()
    

    const handleDescriptionChange = (e:any) => {
        setDescription(e.target.value);
    };

    const handlePublish = () => {
        axios.post(`${BACKEND_URL}/api/v1/blog`, {
            title: title,
            content: description
        },{
            headers:{
                Authorization: localStorage.getItem("token")
            }
        }).then(response => {
            // Handle successful post
            console.log("Post successful", response.data);
            navigate(`/blog/${response.data.id}`); 
        }).catch(error => {
            // Handle error
            console.error("Error posting:", error);
            setError("Error publishing post. Please try again.");
        });
    };
    

    return (
        <div>
            <AppBar />
            <div className="flex justify-center w-full pt-8">
                <div className="max-w-screen-lg w-full">
                    <input 
                        onChange={(e) => setTitle(e.target.value)} 
                        type="text" 
                        id="helper-text" 
                        aria-describedby="helper-text-explanation" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                        placeholder="Title"
                    />
                    <TextEditor onChange={handleDescriptionChange} />
                    {error && <p className="text-red-500">{error}</p>}
                    <button 
                        onClick={handlePublish} 
                        type="submit" 
                        className="pt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200"
                    >
                        Publish post
                    </button>
                </div>
            </div>
        </div>
    );
};

function TextEditor({ onChange }: { onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void }) {
    return (
        <div>
            <div className="py-2 bg-white rounded-b-lg w-full">
                <label htmlFor="editor" className="sr-only">Publish post</label>
                <textarea 
                    id="editor" 
                    rows={8} 
                    onChange={onChange} 
                    className="focus:outline-none block w-full px-0 text-sm text-gray-800 bg-white border-0" 
                    placeholder="Write an article..." 
                    required
                ></textarea>
            </div>
        </div>
    );
}
