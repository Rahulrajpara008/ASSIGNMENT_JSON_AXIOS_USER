import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Crudjson = () => {
    const [data, setData] = useState({
        "name": "",
        "age": ""
    })
    const [allData, setAllData] = useState([])
    const [id, setId] = useState('')
    const handleChange = (e) => {
        const { name, value } = e.target
        setData({
            ...data, [name]: value
        })
    }
    const saveData = (e) => {
        e.preventDefault()
        if (id != "") {
            axios.put("http://localhost:3000/Users/" + id, data)
                .then(() => console.log("Data updated..."))
        }
        else {
            axios.post('http://localhost:3000/Users', data)  
                .then(() => console.log("Data added..."))
        }
        disp()
        setId("")
        setData({
            name: "",
            age: ""
        })
    }
    const disp = () => {
        axios.get('http://localhost:3000/Users')
            .then((msg) => setAllData(msg.data))
    }
    useEffect(() => {
        disp()
    }, [])
    const editData = (id) => {
        axios.patch("http://localhost:3000/Users/" + id)
            .then((res) => setData(res.data))
        setId(id)
    }
    const delData = (id) => {
        axios.delete(`http://localhost:3000/Users/${id}`)
            .then(() => console.log("Data deleted...."))
        disp()
    }
    return (
        <div>
            <form action="#`" method='post' onSubmit={saveData}>
                <input type="text" name="name" id="name" value={data.name} placeholder='Enter your name' onChange={handleChange} required/><br /><br />
                <input type="number" name="age" id="age" value={data.age} placeholder='Enter your age' onChange={handleChange} required /><br /><br />
                <button type='submit'>Submit</button>
            </form>
            <table border={2} align='center' style={{marginTop:"50px"}}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>AGE</th>
                        <th>ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allData.map((i, index) => {
                            return (
                                <tr>
                                    <td>{index+1}</td>
                                    <td>{i.name}</td>
                                    <td>{i.age}</td>
                                    <td>
                                        <button onClick={() => editData(i.id)}>Edit</button>
                                        <button onClick={() => delData(i.id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Crudjson
