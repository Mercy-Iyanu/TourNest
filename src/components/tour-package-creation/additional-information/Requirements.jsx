import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FaPaperPlane } from 'react-icons/fa';

const Requirements = () => {
  const [text, setText] = useState('');

  const modules = {
    toolbar: [
        [{ header: [1, 2, 3, 4, false] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ align: [] }],
        ['link', 'image', 'video'],
        ['blockquote', 'code-block'],
        [{ script: 'sub' }, { script: 'super' }],
        [{ color: [] }, { background: [] }],
        ['table']
    ]
  };

  return (
    <div className="mb-8">
      <label className="font-semibold text-sm block mb-2">
      Requirements or instructions (e.g., fitness level, attire etc) <span className="text-red-500">*</span>
      </label>

      <div className="bg-gray-100 p-3 rounded-md text-sm text-gray-600 flex items-center gap-2 mb-4">
        <FaPaperPlane className="text-gray-500" />
        Use the toolbar to format your text (headers, bold, italic, etc.).
      </div>
      
      <div>
        <ReactQuill
          value={text}
          onChange={setText}
          modules={modules}
          placeholder="e.g  The following instructions are to be adhered to in order to have a smooth adventure:"
          className="h-[200px] w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-[#1D777D] focus:outline-none"
        />
      </div>
    </div>
  );
};

export default Requirements;