import React from 'react'
import { Link } from 'react-router-dom';
import "../styles/LandingPage.css"
const LandingPage = () => {
    return (
        <div>
        	<section className="showcase">
			<div className="video-container">
				<img src="/assets/home-img.jpg" alt="landingPagePicture"/>
			</div>
			<div className="contenttt">
				<h1>Shared flat in Tunisia</h1>
				<h3>Divide rent and common expenses between roomates.</h3>
				<a href="#about" className="btnn">about</a>
			</div>
		</section>

		<section id="about">
			<h1>About</h1>
			<p>
				ONE ROOF web site ,helps you share bills and daily expenses between roommates and allows for transparent financial management.
			</p>
		</section>
		<main className="page-content">
  <div className="card bbody">
    <div className="content">
      <h2 className="title">Verified identites</h2>
      <p className="copy para">Users can verify identity through multiple sources so you can search with confidence ! Our proprietary fraud detction tool helps keep out the spam .</p>
    </div>
  </div>
  <div className="card">
    <div className="content">
      <h2 className="title">A perfect match</h2>
      <p className="copy">Create your personnal roommate profile and get started in minutes ! 
	  Get specific with things like pet preferences , room features , neighborhood details , and more.</p>
    </div>
  </div>
  <div className="card">
    <div className="content">
      <h2 className="title">A real connection</h2>
      <p className="copy">Communicate with potential roommates using our website anywhere .
	  Make a real connection - safe , simple , and convenient .</p>
    </div>
  </div>
  <div className="card">
    <div className="content">
      <h2 className="title">Discover amazing people</h2>
      <p className="copy">Feel like your at home, and make a new family</p>
    </div>
  </div>
</main>
<div className="bottomPage">
	<h3>Find a roommate today ! </h3>
	<p>Sign up now , it's free to get started </p>
	<button className="btnbuttom"><Link to="/register">SIGN UP NOW</Link></button>
</div>
        </div>
    )
}
export default LandingPage