import './PokeInfo.scss'

const PokeInfo = (props) => {
  return (
    <div className="poke-info">
      <h1 className="poke-name">{props.name}</h1>
      <div className="poke-types">
        <h2>Type One: {props.typeOne}</h2>
        {props.typeTwo ? <h2>Type Two: {props.typeTwo}</h2> : null}
      </div>
    </div>
  )
}

export default PokeInfo
