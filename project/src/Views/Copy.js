import React, {useState} from 'react'

const Copy = () => {
    const [copy, setCopy] = useState("0x1279A923012fcd7cEADcE7e4d54E9D4A19251E91")
    const handleCopy = (e)=>{
        e.preventDefault()
        alert("copied")
    }
  return (
      <div className='px-4 '>
          <form onSubmit={handleCopy}>
              <input value={copy} className='form-control' />
              <button className='btn btn-primary'>copy address</button>
          </form>
    </div>
  )
}

export default Copy