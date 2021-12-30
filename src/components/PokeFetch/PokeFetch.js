import { useState, useEffect } from 'react'
import './PokeFetch.scss'

import { BsSearch } from 'react-icons/bs'

import Sprite from '../Sprite/Sprite'
import PokeInfo from '../PokeInfo/PokeInfo'

const PokeFetch = () => {
  const [id, setId] = useState(1)
  const [counter, setCounter] = useState(1)
  const [sprite, setSprite] = useState('')
  const [name, setName] = useState('')
  const [typeOne, setTypeOne] = useState('')
  const [typeTwo, setTypeTwo] = useState('')
  const [search, setSearch] = useState('')
  const [error, setError] = useState(false)

  const url = 'https://pokeapi.co/api/v2/pokemon/'

  const fetchPoke = async (pokeId) => {
    await fetch(`${url}${pokeId}`)
      .then((res) => res.json())
      .then((parsedRes) => {
        if (!parsedRes) {
          throw new Error("Looks like that's not a pokemon!")
        }
        setSprite(parsedRes.sprites.front_default)
        setName(parsedRes.name)
        setTypeOne(parsedRes.types[0].type.name)
        setTypeTwo(parsedRes.types[1]?.type?.name)
        setId(parsedRes.id)
      })

      .catch((err) => {
        console.log(err.message);
        setError(true)
      })
  }

  const rightClick = () => {
    setError(false)
    if (id === 898) {
      setCounter(1)
    } else if (id !== 898) {
      setCounter(id + 1)
    }
    fetchPoke(id)

  }

  const leftClick = () => {
    setError(false)
    if (id === 1) {
      setCounter(898)
    } else if (id !== 1 && id !== 0) {
      setCounter(id - 1)
    }
    fetchPoke(id)
  }

  const searchPoke = (e) => {
    setSearch(e.target.value)
  }

  const submitSearch = (e) => {
    e.preventDefault()
    setSearch('')
    fetchPoke(search.toLowerCase())
  }

  const clearErr = () => {
    setError(false)
  }

  useEffect(() => {
    fetchPoke(counter)
  }, [counter])

  return (
    <div className="content">
      <div className="fetch">
        <Sprite sprite={sprite} name={name}/>
        <div className="buttons">
          <button className="left-btn" onClick={leftClick}>
            {' '}
            &larr;{' '}
          </button>
          <button className="right-btn" onClick={rightClick}>
            {' '}
            &rarr;{' '}
          </button>
        </div>
      </div>

      <form className="search-container" onSubmit={submitSearch}>
        <input className="search" value={search} onChange={searchPoke} />
        <button type="submit" className="search-btn">
          <BsSearch />
        </button>
      </form>
        {error ? <p className="error" onClick={clearErr}>Looks like that's not a pokemon!</p> : null}

      <div className="info">
        <PokeInfo
          name={name[0]?.toUpperCase() + name?.slice(1)}
          typeOne={typeOne}
          typeTwo={typeTwo}
          id={id}
        />
      </div>
    </div>
  )
}

export default PokeFetch
