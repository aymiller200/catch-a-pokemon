import './Sprite.scss'

const Sprite = (props) => {
  return (
    <div className="sprite-container">
      <img className="sprite" src={props.sprite} alt={props.name} />
    </div>
  )
}

export default Sprite
