import React, {useEffect} from 'react';
import Axios from 'axios';
import {useDispatch} from 'react-redux';
import { auth } from '../_actions/user_actions';

// option === null => 아무나 출입 가능한 페이지
// option === true => 로그인한 유저만 출입 가능한 페이지
// option === false => 로그인 하지 않은 유저만 출입 가능한 페이지
export default function (SpecificComponent, option, adminRoute = null) {
    function AuthenticationCheck(props) {
        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(auth()).then(response => {
                if (!response.payload.isAuth) {
                    if (option) {
                        props.history.push('/login');
                    }
                }
                else {
                    if (adminRoute && !response.payload.isAdmin) {
                        props.history.push('/');
                    }
                    else {
                        if (!option) {
                            props.history.push('/');
                        }
                    }
                }
            });
        }, []);

        return (
            <SpecificComponent />
        );
    }

    return AuthenticationCheck;
}