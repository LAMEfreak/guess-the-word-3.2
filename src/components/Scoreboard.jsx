import Table from "react-bootstrap/Table";
import PropTypes from "prop-types";

const Scoreboard = ({ wins, roundsPlayed }) => {
  return (
    <Table
      striped
      bordered
      style={{
        margin: "0 auto",
        border: "2px solid #444444",
        borderRadius: "8px",
        padding: "1rem",
        backgroundColor: "#282828",
        marginBottom: "4rem",
      }}
    >
      <thead>
        <tr>
          <th
            colSpan={2}
            style={{ padding: "0.5rem", fontSize: "1.2rem", width: "10rem" }}
          >
            Total wins
          </th>
          <th
            colSpan={2}
            style={{ padding: "0.5rem", fontSize: "1.2rem", width: "10rem" }}
          >
            Rounds played
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td
            colSpan={2}
            style={{
              paddingBottom: "0.5rem",
              fontSize: "2rem",
              color: "rgb(226, 255, 154)",
              fontWeight: "bold",
            }}
          >
            {wins}
          </td>
          <td
            colSpan={2}
            style={{
              paddingBottom: "0.5rem",
              fontSize: "2rem",
              color: "rgb(190, 162, 255)",
              fontWeight: "bold",
            }}
          >
            {roundsPlayed}
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

Scoreboard.propTypes = {
  wins: PropTypes.number.isRequired,
  roundsPlayed: PropTypes.number.isRequired,
};
export default Scoreboard;
