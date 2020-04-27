import React, {useEffect, useState} from 'react'
import FoodList from '../Food-list/FoodList'
import FoodInput from '../FoodInput/FoodInput'
import Profile from '../Profile/Profile'
import { firestore, auth } from '../../index'
import { Button, Modal} from 'react-bootstrap'

import './Home.css'

const Home = () => {

  const [user, setUser] = useState('')
  const [item, setItem] = useState([''])
  const [calories, setCalories] = useState('')
  const [uid, setUid] = useState('')
  const [list, setList] = useState([''])
  const [result, setResult] = useState('')
  
  const [bio, setBio] = useState('')
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('')

  const editProfile = async () => {
    await firestore.collection('Users').doc(uid).set({bio, weight, height, age, gender})
    window.location.reload()
  }
  
  useEffect(() => {
    getUserState().then(user => {
      setUid(user.uid)
      getUser(user.uid)
      retrieveItems(user.uid)
    })

  }, [])

  const getUserState = async () => {  
    return new Promise(resolve => {
      auth.onAuthStateChanged(resolve)
    })
  }
  
  const getUser = (uid) => {
    firestore.collection('Users').doc(uid).get().then((doc) => {
      const { bio, age, height, weight, gender } = doc.data()
      let myUser = {
        bio: bio,
        age: age,
        height: height,
        weight: weight,
        gender: gender,
        uid: uid
      }
      setUser(myUser)
    })
  }
  
  const retrieveItems = (uid) => {
    let path = '/Users/' + uid + '/items'
    firestore.collection(path).onSnapshot(snapshot => {
      let myItem = snapshot.docs.map(index => {
        const {id, item, calories} = index.data()
        return {id, item, calories}
      })
      setList(myItem)
    })
  }

  const renderMyItems = () => {
    return list.map((item, index) => {
      if(!item){
        return (
          <li>ไม่มีรายการอาหาร...</li>
        )
      }else{
        return (
          <li key={item.id}> 
          <div className="flex">
            <div>
                <span> {item.item} : {item.calories} kCal  </span>
            </div>
            <div className="right">
                <button className="edit-button" onClick= { () => editItem(item.id)}>แก้ไข</button>
                <button className="delete-btn" onClick= { () => deleteItem(item.id)}>ลบ</button>
            </div> 
          </div>
          </li>
        )
      }
    })
  }
  
  const addItems = () => {
    let id = (list.length === 0)?1:list[list.length-1].id+1
    console.log("my uid :" + uid)
    console.log("list: " + id)
    console.log("add item !")
    firestore.collection('Users/'+uid+'/items').doc(id+'').set({ id, item, calories })
  }

  const deleteItem = (id) => {
    let path = '/Users/' + uid + '/items'
    console.log('delete uid: ' + uid)
    console.log('id: ' + id)
    console.log('path: ' + path)
    firestore.collection(path).doc(id+'').delete()
  }

  const editItem = (id) => {
    let path = '/Users/' + uid + '/items'
    firestore.collection(path).doc(id+'').set({ id, item, calories })
  }

  const resetItem = (id) => {
    
  }
  
  const analyze = () => {
    let result = basicEnergy()
    console.log(result)
    if(result === "good"){
      setResult(result)
    }else{
      setResult(result)
    }
  }

  const renderResult = () => {

  }

  const basicEnergy = () => {
    let simulation = 0
    let myEnergy = 0
    let result = ''
    if(user.gender === 'Female' || user.gender === 'female' || user.gender === 'หญิง'){
      simulation = 655 + (13.7 * user.weight) + (1.8 * user.height) - (4.7 * user.age)
    }else{
      simulation = 66 + (13.7 * user.weight) + (5 * user.height) - (6.8 * user.age)
    }
    console.log('my item: ' + list)
    list.map((data, index) => {
      console.log(data)
      myEnergy += parseFloat(data.calories)
    })
    console.log("my energy: " + myEnergy + ' basic energy: ' + simulation)
    if(simulation < myEnergy){
      result = 'bad'
    }else{
      result = 'good'
    }

    return result
  }

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <div className="">
    <div className="middle">
        <Profile profile={user}/>
        
        {/* <ul>
        <FoodList />
        </ul>
        <FoodInput /> */}
                <div className="card">
            <div>
            แก้ไขข้อมูล... <span className="config-button" onClick={handleShow}><i className="fa fa-gear"></i></span>
            </div>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>แก้ไขข้อมูลส่วนตัว</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <span>ชื่อ</span>
            <input type="text" name="name" onChange={ (e) => setBio(e.target.value) } placeholder={user.bio}/>
            <span>เพศ</span>
            <input type="text" name="name" onChange={ (e) => setGender(e.target.value) } placeholder={user.gender}/>
            <span>อายุ</span>
            <input type="text" name="name" onChange={ (e) => setAge(e.target.value) } placeholder={user.age}/>
            <span>น้ำหนัก</span>
            <input type="text" name="name" onChange={ (e) => setWeight(e.target.value) } placeholder={user.weight}/>
            <span>ส่วนสูง</span>
            <input type="text" name="name" onChange={ (e) => setHeight(e.target.value) } placeholder={user.height}/>
            
            
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={() => editProfile()}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
        </div>
        <div className="card">
            <div className="card-header">
            <i className="fa fa-cutlery"></i> ใส่อาหารที่คุณรับประทานวันนี้...
            </div>
            <input type="text" name="item" onChange={ (e) => setItem(e.target.value) } placeholder="ชื่ออาหาร..."/>
            <input type="text" name="calories" onChange= { (e) => setCalories(e.target.value)} placeholder="จำนวนแคลอรี่..."/>
            <span>สามารถดูแคลอรี่จาก <a className="pink" href="https://www.honestdocs.co/table-of-calories-in-food-types" target="_blank">คลิก</a></span>
            <div className="social">
            <div className="social-buttons">
                <span onClick={addItems}><i className="fa fa-plus"></i> เพิ่มอาหาร</span>
            </div>
            </div>

        </div>
        <div className="card">
            <div className="card-header">
            เมนูอาหารของคุณ
            </div>
            <ul>
            { renderMyItems() }
            </ul>
            <div className="social">
            <div className="social-buttons">
                <span onClick={ () => analyze()}><i class="fa fa-calculator"></i> คำนวณ</span>
            </div>         
            </div>
        </div>
        <div className="card">
            <div className="card-header">
            ผลลัพธ์หลังจากคำนวณ
            </div>
            <p>{result}</p>
        </div>
        </div>
    </div>
  )
}

export default Home