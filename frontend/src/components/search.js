import React from 'react'
import {Form, Button} from 'react-bootstrap'

function Search(props) {
    const [term, setTerm] = React.useState('')
    console.log(term)


    function startSearch(e) {
        e.preventDefault()
        if (term !== '') {
            props.searchMusic(term)  
        }
    }

    return (
        <Form onSubmit={startSearch} inline
            type='text'
            className='mr-sm-2 ml-sm-5'
        >

        <Button
            type='submit'
            variant='outline-success'
            className='p-2'
        >
            Submit
        </Button>
        </Form>
    )
}

export default Search
