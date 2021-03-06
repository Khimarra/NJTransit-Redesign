import React, { useState } from 'react'
import '../../styles/buyticket.css'
import boardingIcon from '../../images/boarding-icon.png'
import travelTimeIcon from '../../images/travel-time-icon.png'
import stoppingAtIcon from '../../images/stopping-at-icon@2x.png'
import Axios from 'axios'
import apiUrl from '../../apiConfig'
import BoughtTicket from '../popups/BoughtTicket'

const BuyTicket = (props) =>
{

    let ticketType = props.ticketType

    const getPrice = () =>
    {
        if (!ticketType)
        {
            return 0.00
        } else
        {
            let number = ticketType.replace(/[^\d.]/g, '')
            let price = parseFloat(number)
            return price
        }
    }

    const getTax = () =>
    {
        let price = getPrice()
        let tax = parseFloat((price * 0.08).toFixed(2))
        return tax
    }

    const [checkbox, setCheckbox] = useState(false)

    const donationCheck = (event) =>
    {
        setCheckbox(event.target.checked)
    }

    const getDonation = () =>
    {
        if (checkbox)
        {
            let price = getPrice()
            let tax = getTax()
            let subTotal = parseFloat((price + tax).toFixed(2))
            let total = parseFloat(Math.ceil(subTotal).toFixed(2))
            let donation = parseFloat((total - subTotal).toFixed(2))
            return donation
        } else
        {
            return 0.00
        }
    }

    const getTotal = () =>
    {
        let price = getPrice()
        let tax = getTax()
        let donation = getDonation()
        let total = price + tax + donation
        return total
    }

    const [seen, setSeen] = useState(false)

    const handleClick = async (event) => {

        setSeen(!seen)

        Axios({
            url: `${apiUrl}/api/tickets`,
            method: 'POST',
            data: {
                type: props.ticketType,
                startLocation: props.fromValue,
                endDestination: props.toValue,
                travelTime: Math.ceil(Math.random(50)),
                price: getPrice(),
                tax: getTax(),
                donation: checkbox,
                busId: Math.ceil(Math.random(35))
            }
        })
            .catch(console.error)
    }

    return (
        <div>
            <div className='travel-grid'>
                <img className='boarding-image' src={boardingIcon} alt='boarding-icon'></img>
                <h5 className='boarding-on'>Boarding on:</h5>
                <h4 className='platform'>Platform 2</h4>

                <img className='travel-image' src={travelTimeIcon} alt='travel-time-icon'></img>
                <h5 className='travel-time'>Travel Time:</h5>
                <h4 className='times'>
                    <span className='time-span'>7:15 AM</span>
                    —
                    <span className='time-span'>8:20 AM</span>
                </h4>
            </div>

            <div className='stopping-at'>
                <img className='stopping-image' alt='Stopping At' src={stoppingAtIcon}></img>
                <h4 className='stopping-text'>Stopping at:</h4>
            </div>

            <div className='stops'>
                <div className='blue-line'></div>

                <div className='c1 r1'><h5 className='time'>7:15 AM</h5></div>
                <div className='c2 r1'></div>
                <div className='c3 r1'><h4 className='stop-name'>{props.fromValue}</h4></div>

                <div className='c1 r2'><h5 className='time'> </h5></div>
                <div className='c2 r2'></div>
                <div className='c3 r2'><p className='click'>(Click to see more)</p></div>

                <div className='c1 r3'><h5 className='time'>8:05 AM</h5></div>
                <div className='c2 r3'></div>
                <div className='c3 r3'><h4 className='stop-name'>Asbury Park</h4></div>

                <div className='c1 r4'><h5 className='time'>8:20 AM</h5></div>
                <div className='c2 r4'></div>
                <div className='c3 r4'><h4 className='stop-name'>{props.toValue}</h4></div>
            </div>

            <div className='donation'>
                <input
                    onChange={donationCheck}
                    className='donation-checkbox'
                    type='checkbox'
                    name='donation'
                />
                <p className='donation-text'>
                    Would you like to <span className='bold-span'>round up your total </span>to donate to homelessness in NYC?
                </p>
            </div>

            <div className='final-price'>
                <h5 className='final-ticket-type'>{props.ticketType}</h5>
                <h5 className='final-tax'>Tax: ${getTax()}</h5>
                <h5 className='donation-amount'>Donation: ${getDonation()}</h5>
                <div className='total-line'></div>
                <h4 className='final-total'>${getTotal()}</h4>
            </div>

            <div className='button-grid'>
                <button
                    className='buy-ticket-button'
                    type='button'
                    onClick={handleClick}>
                    <span className='buy-ticket-button-text'>
                        Buy Ticket
                    </span>
                </button>
                {seen ? <BoughtTicket toggle={handleClick} /> : null}
            </div>

        </div>
    )
}

export default BuyTicket