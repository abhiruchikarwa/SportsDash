import React from 'react'
import { Link } from 'react-router-dom';

const TeamRow = ({ teams }) =>
    <ul>
        {
            teams.map((team, index) => {
                return <li key={index}>
                    <Link to={`/team/${team.id}`}>
                        {team.market} {team.name}
                    </Link>
                </li>
            })
        }
    </ul>

export default TeamRow;