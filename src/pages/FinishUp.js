import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { Link, useHistory } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import Cookies from 'universal-cookie';
import queryString from 'query-string';
import { SET_CUR_PAGE, SET_USER_PROFILE, GET_USER_PROFILE, SET_ISMEMBER, ADD_TO_MYSAVES, RESET_MYBOOT, GET_CURBOOT, SHOW_ALERT, SHOW_LOAD, DISMISS_LOAD } from '../redux_helper/constants/action-types';
import { RoundYellowBtn, RoundWhiteBtn, TextBtn } from '../components/btns';
import { memberPrice, stripe_pubkey, ORDER_STATUS_NEW } from '../utils/constant';
import { doPost } from '../utils/http';
import { createOrder, getMyOrders } from '../apis/order'
import { createMember, getMember } from '../apis/member'

const cookies = new Cookies();
const stripePromise = loadStripe(stripe_pubkey);

const FinishUp = (props) => {
    const history = useHistory();
    const [checkoutRedirecting, SetCheckoutRedirectiong] = useState(false);
    const [pageId, setPageId] = useState(0);
    const [phone, setPhone] = useState('');
    const [isLoaded, SetIsLoaded] = useState(false)

    useEffect(() => {
        props.dispatch({ type: SET_CUR_PAGE, payload: 'Finish Up' })

        if (isLoaded == false) {
            props.dispatch({ type: GET_USER_PROFILE, payload: {} })
            SetIsLoaded(true)
        }
        else {
            if (props.curboot.isLoaded == false) {
                props.dispatch({ type: GET_CURBOOT, payload: {} })
            }
            else {
                let tmps = document.location.hash.split("?")
                if (tmps != null && tmps.length > 1) {
                    let query = queryString.parse(tmps[1])
                    if (query.sessid != null && query.sessid != '') {
                        // save session to cookie with 12 hours ( stripe session expire time : 24 hours)
                        let d = new Date();
                        d.setTime(d.getTime() + (12 * 60 * 60 * 1000));
                        cookies.set('stripe_session', query.sessid, { path: '/', expires: d });
                    }
                    if (query.tab != null && query.tab != '') {
                        setPageId(parseInt(query.tab))
                    }
                }
                setPhone(props.user_profile.phone || '')
                if (props.curboot.left_icon == '') {
                    history.push('/left')
                    return;
                }
                if (props.curboot.right_icon == '') {
                    history.push('/right')
                    return;
                }
                if (props.curboot.size == '') {
                    history.push('/size')
                    return;
                }
                if (props.curboot.bootname == '') {
                    history.push('/name')
                    return;
                }
            }
        }
        

    }, [props.curboot, props.user_profile])

    const goProfile = (tab) => {
        history.push('/profile?tab=' + tab)
    }

    const onSetPhone = (text) => {
        props.dispatch({
            type: SET_USER_PROFILE,
            payload: Object.assign({}, props.user_profile, {
                phone: text
            })
        })
    }


    const _renderPage0 = () => {
        const designAnother = () => {
            props.dispatch({ type: SET_ISMEMBER, payload: false })
            props.dispatch({
                type: ADD_TO_MYSAVES, payload: Object.assign({}, props.curboot, {
                    id: '' + new Date().getTime()
                })
            })
            props.dispatch({ type: RESET_MYBOOT, payload: {} })
            history.push('/pick_color') // go pick color page
        }

        const goNext = () => {
            // check if user is already registered and become a member, or not
            if(props.user_profile.phone == null) {
                setPageId(1) // else go to "become a member" page
                return;
            }
            
            props.dispatch({ type: SHOW_LOAD, payload: '' })

            // cur member of this phone
            getMember(props.user_profile.phone).then(response => {
                props.dispatch({ type: DISMISS_LOAD, payload: '' })
                if(response.docs.length > 0 ) { // if user is already a member
                    setPageId(3) //we can skip "become a member" page
                } 
                else { // no member
                    setPageId(1) // else go to "become a member" page
                }
            })
            .catch(error => {
                console.log('getMember ', error)
                props.dispatch({ type: DISMISS_LOAD, payload: '' })
                setPageId(1) // else go to "become a member" page
            })
        }

        return (
            <div className='name_btnsview vcenter_start w-100' >
                <div className="question_txt">
                    Have another child?
                    </div>
                <RoundYellowBtn name='Design another pair' onClick={() => designAnother()} />
                <div style={{ height: 20 }}></div>
                <RoundWhiteBtn name='Nope, let’s keep going' onClick={() => goNext()} />
            </div>
        )
    }
    const _renderPage1 = () => {
        const becomeMember = () => {
            props.dispatch({ type: SET_ISMEMBER, payload: true })
            setPageId(2)
        }

        const saveDesign = () => {
            props.dispatch({ type: SET_ISMEMBER, payload: false })
            props.dispatch({
                type: ADD_TO_MYSAVES, payload: Object.assign({}, props.curboot, {
                    id: '' + new Date().getTime()
                })
            })
            goProfile(0)
        }

        return (
            <div className='vcenter_start w-100' >
                <div className='name_btnsview vcenter_start w-100' >
                    <div className="question_txt">
                        Become an Outgrow member and get this pair free
                    </div>
                    <RoundYellowBtn name={'Become a member - $' + memberPrice} onClick={() => becomeMember()} />
                    <div style={{ height: 20 }}></div>
                    <TextBtn name='No thanks! Just save my design for later.' onClick={() => saveDesign()} />
                </div>
                <div className="membership_promise">
                    <h2>Our Membership Promise</h2>
                    <h4>Membership means your <span className="fw-700">designs</span> 🎨 , a ️ <span className="fw-700">home</span> ♻ for your old boots and shoes, and <span className="fw-700">great prices</span> 😚... always.</h4>
                    <p>🎨 <span className="fw-700">Your designs:</span>  You will always have the option to pick the perfect decals for your boots (and for your summer shoes, which go on sale in May :)</p>
                    <p>♻️ <span className="fw-700">A home for your old boots:</span> Shipping is always free – both to you and then back to us when you’re ready to move on to a new pair and find your old boots and shoes a good home with a family in need</p>
                    <p>😚 <span className="fw-700">Great prices:</span> Our boots (including the decals you pick out) will always be $18. Summer shoes will always be $15. By saving money on each pair of boots and shoes, most families end up saving money for the year when they become Outgrow members</p>
                </div>
                <div className='name_btnsview vcenter_start w-100' >
                    <div className="question_txt">
                        Become an Outgrow member and get this pair free
                    </div>
                    <RoundYellowBtn name={'Become a member - $' + memberPrice} onClick={() => setPageId(2)} />
                    <div style={{ height: 80 }}></div>
                </div>
            </div>
        )
    }
    const _renderPage2 = () => {
        const createCheckoutSession = async () => {
            if (cookies.get('stripe_session') != null) { // if stripe session exist, we can go to next 
                setPageId(3)
                return;
            }
            SetCheckoutRedirectiong(true)
            // Get Stripe.js instance
            const stripe = await stripePromise;

            // Call your backend to create the Checkout Session
            try {
                const response = await doPost('/create-checkout-session', { phone: props.user_profile.phone });
                console.log('response', response)
                const session = await response.data;
                console.log('/create-checkout-session', session)

                // When the customer clicks on the button, redirect them to Checkout.
                const result = await stripe.redirectToCheckout({
                    sessionId: session.id,
                });

                SetCheckoutRedirectiong(false)
                if (result.error) {
                    // If `redirectToCheckout` fails due to a browser or network
                    // error, display the localized error message to your customer
                    // using `result.error.message`.
                    props.dispatch({ type: SHOW_ALERT, payload: { type: 'error', msg: result.error.message } });
                }

            }
            catch (err) {
                SetCheckoutRedirectiong(false)
                console.log('Error on getting session', err.response)
                if (err.response.data != null) {
                    props.dispatch({ type: SHOW_ALERT, payload: { type: 'error', msg: err.response.data.msg } });
                }
                else {
                    props.dispatch({ type: SHOW_ALERT, payload: { type: 'error', msg: 'Something went wrong!' } });
                }
            }
        }
        return (
            <div className='name_btnsview vcenter_start w-100' >
                <div className="question_txt" style={{ color: checkoutRedirecting ? '#666' : '#000' }}>
                    Confirm your phone number
                </div>
                <input
                    disabled={checkoutRedirecting}
                    type="text" className="input-rount-sm"
                    placeholder='Phone number'
                    value={phone}
                    onChange={e => onSetPhone(e.target.value)}
                />
                <div style={{ height: 20 }}></div>
                <RoundYellowBtn disabled={checkoutRedirecting} name='Save and Pay' onClick={() => createCheckoutSession()} />
                <div style={{ height: 20 }}></div>
                {
                    checkoutRedirecting &&
                    <div style={{ width: '100%', textAlign: 'center', color: '#000', fontSize: 16, fontWeight: '500', fontStyle: 'italic' }}>
                        Redirecting for payment
                    </div>
                }
            </div>
        )
    }

    const _renderPage3 = () => {

        const doPay=()=>{
            if(props.user_profile.phone == null) {
                setPageId(2)
                return;
            }
            
            props.dispatch({ type: SHOW_LOAD, payload: 'Creating your order...' })

            // cur member of this phone
            getMember(props.user_profile.phone).then(response => {
                if(response.docs.length > 0 ) { // if user is already a member
                    payWithCustomer(response.docs[0].data())
                } 
                else { // no member
                    payWithSession()
                }
            })
            .catch(error => {
                payWithSession()
                // console.log('pay', error)
            })
        }

        const payWithSession = async () => {
            if (cookies.get('stripe_session') == null) { // if stripe session exist, we can go to next 
                setPageId(2)
                return;
            }

            try {
                let response = await doPost('/pay_with_session', { sessionId: cookies.get('stripe_session') });
                cookies.remove('stripe_session') // clear current session
                let paymentIntent = response.data.paymentIntent

                // create a member
                let new_member = {
                    id: paymentIntent.customer,
                    phone: props.user_profile.phone,
                    payment_method_id: paymentIntent.payment_method,
                    payment_method_types: paymentIntent.payment_method_types
                }
                await createMember(new_member)
                
                // save order to database
                saveOrder(paymentIntent)
            }
            catch (err) {
                cookies.remove('stripe_session') // clear current session
                console.log('Error on paying with session', err.response)
                props.dispatch({ type: DISMISS_LOAD, payload: '' })
                if (err.response.data != null) {
                    props.dispatch({ type: SHOW_ALERT, payload: { type: 'error', msg: err.response.data.msg } });
                }
                else {
                    props.dispatch({ type: SHOW_ALERT, payload: { type: 'error', msg: 'Something went wrong!' } });
                }
            }
        }

        const payWithCustomer = async (customerInfo) => {
           
            try {
                let response = await doPost('/pay_with_customer', 
                    { 
                        customer : customerInfo.id,
                        payment_method_id : customerInfo.payment_method_id,
                        payment_method_types : customerInfo.payment_method_types
                });

                let paymentIntent = response.data.paymentIntent
                // save order to database
                saveOrder(paymentIntent)
            }
            catch (err) {
                cookies.remove('stripe_session') // clear current session
                console.log('Error on paying with session', err.response)
                props.dispatch({ type: DISMISS_LOAD, payload: '' })
                if (err.response.data != null) {
                    props.dispatch({ type: SHOW_ALERT, payload: { type: 'error', msg: err.response.data.msg } });
                }
                else {
                    props.dispatch({ type: SHOW_ALERT, payload: { type: 'error', msg: 'Something went wrong!' } });
                }
            }
        }

        const saveOrder = (paymentIntent) =>{
             // save order to database
            let new_order = {
                payment_id: paymentIntent.id,
                payment_method_id: paymentIntent.payment_method,
                payment_method_types: paymentIntent.payment_method_types,
                amount: paymentIntent.amount / 100,
                currency: paymentIntent.currency,
                status: ORDER_STATUS_NEW,
                bootitem: props.curboot,
                customer: {
                    id: paymentIntent.customer,
                    phone: props.user_profile.phone,
                },
                description: paymentIntent.description,
            }

            createOrder(new_order).then(response => {
                props.dispatch({ type: DISMISS_LOAD, payload: '' })
                props.dispatch({ type: SHOW_ALERT, payload: { type: 'success', msg: 'Success! Your order has been received!' } })
                props.dispatch({ type: RESET_MYBOOT, payload: {} })
                goProfile(1)
            })
            .catch(err => {
                console.log('Error on creating order', err)
                props.dispatch({ type: DISMISS_LOAD, payload: '' })
                props.dispatch({ type: SHOW_ALERT, payload: { type: 'error', msg: 'Error on creating order!' } });
            })
        }


        return (
            <div className='name_btnsview vcenter_start w-100' >
                <div className="question_txt" style={{ margin: 0, marginTop: 20, marginBottom: 4 }}>
                    All set? Give them
                </div>
                <div className="question_txt" style={{ margin: 0, marginBottom: 20 }}>
                    one more look!
                </div>
                <RoundYellowBtn name='Yes! Send them to me' onClick={() => doPay()} />
                <div style={{ height: 4 }}></div>
                <TextBtn name='Not yet! I want to make a change' onClick={() => {
                    history.push('/name')
                }} />
            </div>
        )
    }

    return (
        <div className="flex_grow_1 scrollable">
            <div className="boot_img_view">
                <img src={"assets/boots/" + props.curboot.color + "_Top.png"} className="boot_img" />
                {
                    props.curboot.left_icon != '' &&
                    <img src={"assets/items/" + props.curboot.left_icon + ".svg"} className="boot_left_icon" />
                }
                {
                    props.curboot.right_icon != '' &&
                    <img src={"assets/items/" + props.curboot.right_icon + ".svg"} className="boot_right_icon" />
                }
                <div className="sizeView vcenter">
                    <p>Size</p>
                    <div className="vcenter">{props.curboot.size}</div>
                </div>
            </div>

            {
                pageId == 0 && _renderPage0()
            }
            {
                pageId == 1 && _renderPage1()
            }
            {
                pageId == 2 && _renderPage2()
            }
            {
                pageId == 3 && _renderPage3()
            }
        </div>
    )
}

const mapstate_props = (state) => {
    return {
        active_page: state.globalReducer.active_page,
        curboot: state.bootReducer,
        user_profile: state.userReducer.user_profile
    }
}
export default connect(mapstate_props)(FinishUp)