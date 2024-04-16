export default function CarRow({ car }) {
    return (<tr>
        <td>{car.make}</td>
        <td>{car.model}</td>
        <td>{car.year}</td>
    </tr>)

}