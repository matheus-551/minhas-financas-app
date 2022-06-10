import React from 'react';

import { Navbar } from '../components/Navbar';
import { AppRoute } from './AppRoute'

import 'bootswatch/dist/flatly/bootstrap.css';
import '../custom.css'

import 'toastr/build/toastr.min.js'
import 'toastr/build/toastr.css'

import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";

function App() {

  return (
    <>
      <Navbar/>
      <div className="container">
        <AppRoute/>
      </div>
    </>
  )
}

export default App
