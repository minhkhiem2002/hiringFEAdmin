import ChartImage from '../../assets/images/Chart.gif'
function HomePage() {
  
    return ( 
      <div className="bg-white h-full w-full rounded-[3px] shadow-2xl ml-2">
          <img src = {ChartImage} alt = "Page Not Found" className='w-full h-full rounded-[3px] shadow-2xl'/>
      </div>
     );
}

export default HomePage;