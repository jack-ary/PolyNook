function Registrations(props) {
    return (
        <div>
            <h1>This is your registrations currently, {props.profile.name}</h1>
            <p>{props.registrations_list}</p>
        </div>
    )
}

export default Registrations
