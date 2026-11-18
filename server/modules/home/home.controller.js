import getHomeViewModel from "./home.service.js";

export default function renderHome(req, res) {
  //Cargando el ViewModel
  const viewModel = getHomeViewModel(); 
  //Entregando la vista 
  res.render('index', viewModel) 
}