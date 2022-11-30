import axios from "axios";

const URL_TICKETS =
  "https://fiuba-memo1-api-soporte.azurewebsites.net/api/v1/tickets";

export async function GetTickets(setLoading, setError, filtros) {
  var response;
  if (filtros !== "") {
    response = GetWithFilter(filtros, setLoading, setError);
  } else {
    response = await axios
      .get(URL_TICKETS)
      .then(
        setTimeout(() => {
          setLoading(false);
        }, 2000)
      )
      .catch((error) => setError(true));
  }
  return response;
}

async function GetWithFilter(filtros, setLoading, setError) {
  var response = await axios
    .get(URL_TICKETS + "?" + filtros)
    .then(
      setTimeout(() => {
        setLoading(false);
      }, 2000)
    )
    .catch((error) => setError(true));
  return response;
}
