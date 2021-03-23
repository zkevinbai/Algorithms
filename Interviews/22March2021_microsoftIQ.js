/*
1

Input
String consists of upercase letters
String contains at least one BALLOON

Output
How many BALLOONS does the word contain
*/

/*
solution,

balloon is 7 letters long
 1 b
 1 a
 2 l
 2 0
 1 n

count the B A L O N
divide by baloon usage

return the lowest number 
(intuition, you can have 100 ls, but if you only have one b, your count is 1)
 */

function solution(S) {
    const letters = {};

    for (let i = 0; i < S.length; i++) {
        const letter = S[i];

        if (letters[letter]) {
            letters[letter] += 1;
        } else {
            letters[letter] = 1;
        }
    }

    let bCount = letters['B'] / 1;
    let aCount = letters['A'] / 1;
    let lCount = letters['L'] / 2;
    let oCount = letters['O'] / 2;
    let nCount = letters['N'] / 1;

    return Math.floor(Math.min(bCount, aCount, lCount, oCount, nCount));
}

// let example = 'QAWABAWONL';

// console.log(solution(example));
// 1 hour left

/* 2

build a react component, a table with pagination

you can get id, first name, and last name frm the url provided using the fetch api
the endpoint accepts the query parameter "page"

steps
    1 get data
    2 use data

*/
import React, { useState, useEffect } from 'react';

const USERS_URL = 'https://example.com/api/users';

export default function Table() {
    const [loadingState, setLoadingState] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [userData, setUserData] = useState([]);

    const changePage = (target) => {
        if (target === 0 || target === 10) {
            setCurrentPage(target);
        } else if (target < 0) {
            setCurrentPage(0);
        } else if (target > 10) {
            setCurrentPage(10);
        } else {
            setCurrentPage(target);
        }

        getData();
    }

    const getData = () => {
        setLoadingState(true);
        fetch(USERS_URL + '?page=' + currentPage)
            .then(
                function (response) {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' +
                            response.status);
                        return;
                    }

                    // Examine the text in the response
                    response.json().then(function (data) {
                        setLoadingState(false);
                        setUserData(data.results);
                    });
                }
            )
            .catch(function () {
                console.log("oh no")
            });
    }

    const renderUsers = () => {


        return (
            {

            }
        );
    };

    useEffect(() => {
        getData(0);
    }, []);

    console.log('u', userData)
    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                    </tr>
                </thead>
                <tbody>
                    //  render elements in tbody
                    {
                        userData.map((user) => {
                            return (
                                <tr>
                                    <th>{user.id}</th>
                                    <th>{user.firstName}</th>
                                    <th>{user.lastName}</th>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <section className="pagination">
                <button
                    onClick={() => changePage(0)}
                    disabled={loadingState}
                    className="first-page-btn"
                >
                    first
                </button>
                <button
                    onClick={() => changePage(currentPage - 1)}
                    disabled={loadingState}
                    className="previous-page-btn"
                >
                    previous
                </button>
                <button
                    onClick={() => changePage(currentPage + 1)}
                    disabled={loadingState}
                    className="next-page-btn"
                >
                    next
                </button>
                <button
                    onClick={() => changePage(10)}
                    disabled={loadingState}
                    className="last-page-btn"
                >
                    last
                </button>
            </section>
        </div>
    );
};
