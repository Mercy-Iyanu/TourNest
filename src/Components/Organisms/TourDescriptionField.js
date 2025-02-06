import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import { FaInfoCircle } from 'react-icons/fa';

const TourDescriptionField = () => {
  const [text, setText] = useState('');

  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ align: [] }],
      ['link'],
      ['blockquote'],
      [{ script: 'sub' }, { script: 'super' }],
      ['image'],
    ],
  };

  return (
    <div className="mb-8">
      <label className="font-semibold text-lg block mb-2">
        Detailed description of the tour <span className="text-red-500">*</span>
      </label>

      <div className="bg-gray-100 p-3 rounded-md text-sm text-gray-600 flex items-center gap-2 mb-4">
        <FaInfoCircle className="text-gray-500" />
        Use the toolbar to format your text (headers, bold, italic, etc.).
      </div>

      {/* React-Quill Editor */}
      <div>
        <ReactQuill
          value={text}
          onChange={setText}
          modules={modules}
          placeholder="With rich natural vegetation and a picturesque view, Obudu is increasingly becoming popular"
          className="h-[200px] w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-[#1D777D] focus:outline-none"
        />
      </div>
    </div>
  );
};

export default TourDescriptionField;