import React, { useEffect, useState } from 'react'
import './ToDoList.css'
import Item from './components/Item';
import List from './components/List';
import Form from './components/Form';
import Modal from './components/Modal';

const SAVE_ITEMS = "savedItems";


function ToDoList() {

    const [showModal, setShowModal] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        let savedItems = JSON.parse(localStorage.getItem(SAVE_ITEMS));

        if (savedItems) {
            setItems(savedItems);
        }
    }, []);

    useEffect(() => {

        localStorage.setItem(SAVE_ITEMS, JSON.stringify(items))
    }, [items]);

    function onAddItem(text) {

        let item = new Item(text);
        setItems([...items, item]);
        onHideModal();
    }

    function onItemDeleted(item) {

        let filteredItems = items.filter(it => it.id !== item.id);
        setItems(filteredItems);

    }

    function onDone(item) {
        let updatedItems = items.map(it => {
            if (it.id === item.id) {
                it.done = !it.done;
            }
            return it;
        });

        setItems(updatedItems);


    }

    function onHideModal(){
        setShowModal(false)
    }


    return (<div className='container'>
        <header className='header'>
            <h1>ToDoList</h1>
            <button onClick={() => {setShowModal(true)}} className='addButton'>+</button>

        </header>

        {/*<Form  onAddItem={onAddItem}></Form>*/}
        <List onDone={onDone} onItemDeleted={onItemDeleted} items={items}></List>
        <Modal show={showModal} onHideModal={onHideModal}>
            <Form onAddItem={onAddItem}></Form>

        </Modal>



    </div>)
}





export default ToDoList