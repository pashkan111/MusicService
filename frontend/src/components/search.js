import React from 'react'
import {Form, Button, FormControl} from 'react-bootstrap'
import {useDispatch} from 'react-redux'
import {searchItem} from '../Actions/playlistActions'

function Search(props) {
    const [term, setTerm] = React.useState('')
    const dispatch = useDispatch()

    function startSearch(e) {
        e.preventDefault()
        dispatch(searchItem(term))

    }

    return (
        <Form onSubmit={startSearch}
            className='mr-sm-2 ml-sm-5'
        >
            <FormControl
                type='text'
                placeholder='Поиск'
                onChange={(e) => setTerm(e.target.value)}
            >
            </FormControl>
        <Button
            type='submit'
            variant='outline-success'
            className='p-2'
        >
            Найти
        </Button>
        </Form>
    )
}

export default Search
