import { useState, useEffect } from "react"
import PropTypes from "prop-types"

const Drink = ({ cocktailDB }) => {
    const [currentDrink, setCurrentDrink] = useState(0)
    const [drinkDetails, setDrinkDetails] = useState(false)
    const [drinksDB, setDrinksDB] = useState(cocktailDB)
    const [autoplay, setAutoplay] = useState(true)
    const [isHovered, setIsHovered] = useState(false)
    const [currentClassName, setCurrentClassName] = useState('')

    useEffect(() => {
        async function fetchCocktailData() {
            const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=`
            try {
                const response = await fetch(url)
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                const data = await response.json()
                setDrinksDB(data.drinks)
            } catch (error) {
                console.error("Could not fetch the data:", error)
            }
        }
        if (!drinksDB || drinksDB.length === 0) {
            fetchCocktailData();
        }
    }, [drinksDB])

    useEffect(() => {
        let intervalId
        if (autoplay && !isHovered) {
            intervalId = setInterval(nextDrink, 3000);
        }
        return () => clearInterval(intervalId)
    }, [autoplay, isHovered])

    const nextDrink = () => {
        setCurrentClassName('slide-left')
        setTimeout(() => {
            setCurrentDrink((prev) => (prev + 1) % drinksDB.length)
            setDrinkDetails(false)
            setCurrentClassName('')
        }, 500)
    };

    const prevDrink = () => {
        setCurrentClassName('slide-right')
        setTimeout(() => {
            setCurrentDrink((prev) => (prev - 1 + drinksDB.length) % drinksDB.length)
            setDrinkDetails(false)
            setCurrentClassName('')
        }, 500)
    }

    const toggleDetails = () => {
        setDrinkDetails((prev) => !prev)
        if (drinkDetails) {
            setAutoplay(true)
        } else {
            setAutoplay(false)
        }
    }

    const handleHover = (hover) => {
        setIsHovered(hover)
    }

    const handleAutoplayToggle = () => {
        setAutoplay(!autoplay)
    }

    return (
        <div className="carousel-container">
            <div
                className={`carousel-slide ${currentClassName}`}
                onMouseEnter={() => handleHover(true)}
                onMouseLeave={() => handleHover(false)}
            >
                <img
                    src={drinksDB[currentDrink]?.strDrinkThumb || ''}
                    alt={drinksDB[currentDrink]?.strDrink || ''}
                    className="drinks-display"
                />
                {drinkDetails && (
                    <div className="drink-details">
                        <h3>{drinksDB[currentDrink]?.strDrink || ''}</h3>
                        <p>{drinksDB[currentDrink]?.strInstructions || ''}</p>
                    </div>
                )}
            </div>
            <div id='control'>
                <div>
                    <button onClick={toggleDetails} id='details'>View Details</button>
                    <button onClick={handleAutoplayToggle} className='left'>
                        {autoplay ? "Pause" : "Play"}
                    </button>
                </div>
                <button onClick={prevDrink} className='left'>Previous</button>
                <button onClick={nextDrink} className='left'>Next</button>
            </div>
        </div>
    );
}

Drink.defaultProps = {
    cocktailDB: [],
}

Drink.propTypes = {
    cocktailDB: PropTypes.array,
}

export default Drink;
