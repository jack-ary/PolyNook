function Registrations(props) {
    return (
        <div>
            {props.profile == null ? (
                <h1>Please, Login to use the Registrations Page.</h1>
            ) : (
                <div>
                    <h1>
                        This is your registrations currently,{' '}
                        {props.profile.name}
                    </h1>
                    <p>{props.registrations_list}</p>
                </div>
            )}
        </div>
    )
}

export default Registrations
