import React from "react";

export default function TextResultPanel({shopQueues}:{shopQueues:string}) {
  return <>
    <div className="card bg-base-300 p-3">
      <h1 className='text-accent font-semibold'>Output</h1>
      <textarea value={shopQueues} rows={16} readOnly
                className='textarea w-full h-full whitespace-pre-wrap'></textarea>
    </div>
  </>
}