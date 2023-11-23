import { db } from "./firebaseConfig";
import { onValue, ref, query, orderByChild, remove, get, update, set } from 'firebase/database';
import { Children } from "react";

//displays the content for the specific community entry when the user clicks the link 
export function displayCommunityEntryContent(headline, date) {
 
        const userLocation = localStorage.getItem('RefLocation');
        const dbRef = ref(db, 'users/' + userLocation + '/posts');
        var content = "Placeholder";

    return get(dbRef).then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();
            if (childData.Headline.trim() === headline.trim() && childData.date.trim() === date.trim()) {
                content = childData.content;
                return;
            }
        });
        return content;
    });
}

//creates the list of community entries when the user navigates to the community page 
export function communityPageDisplay() {
    return new Promise((resolve, reject) => {

        var posts = [];
        const dbRef = query(ref(db, 'community/posts'));

        onValue(dbRef, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const childData = childSnapshot.val();

                const { Headline, date, Username } = childData;
                posts.push("Headline: " + Headline + " | Username: " + Username + " | Date: " + date);
            });
            resolve(posts);
        }, (error) => {
            reject(error);
        });
    });
};

export function searchCommunityJournalEntry(inputString) {
    const userPostsRef = ref(db, `community/posts`);

    const lowercaseInputString = inputString.toLowerCase();
    const searchQuery = query(
        userPostsRef,
        orderByChild('Headline'),
    );

    return get(searchQuery).then((snapshot) => {
        const searchResults = [];

        if (snapshot.exists()) {
            snapshot.forEach((postSnapshot) => {
                const post = postSnapshot.val();
                const headline = post.Headline;

                const lowercaseHeadline = headline.toLowerCase();

                if (lowercaseHeadline.includes(lowercaseInputString)) {
                    const resultString = "Headline: " + headline + " | Username: " + post.Username + " | Date: " + post.date;
                    searchResults.push(resultString);
                }
            });
        }

        return searchResults;
    }).catch((error) => {
        console.error('Error getting data:', error);
        throw error;
    });
}

export function userAccountCommunityDelete(username) {
    const dbRef = ref(db, 'community/posts');

    return get(dbRef).then((snapshot) => {
        const deletePromises = [];

        snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();
            const communityUsername = childData.Username;

            if (username === communityUsername) {
                const removeRef = ref(db, `community/posts/${childSnapshot.key}`);
                const deletePromise = remove(removeRef);
                deletePromises.push(deletePromise);
            }
        });

        return Promise.all(deletePromises);
    });
}

export function increaseFlagCounter(headline, date, username) {
    const dbRef = ref(db, 'community/posts');

    return get(dbRef).then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();

            if (
                childData.Headline.trim() === headline.trim() &&
                childData.Username.trim() === username.trim() &&
                childData.date.trim() === date.trim()
            ) {
                const updatedFlagCount = childData.flagCount + 1;

                const updates = {};
                updates[`/community/posts/${childSnapshot.key}/flagCount`] = updatedFlagCount;
                console.log('flag count', updatedFlagCount);
                return update(ref(db), updates);
            }
        });
    });
}

export function getFlagCount(headline, date, username) {
    const dbRef = ref(db, 'community/posts');
    var flagCount = 0;
    return get(dbRef).then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();
            if (
                childData.Headline.trim() === headline.trim() &&
                childData.Username.trim() === username.trim() &&
                childData.date.trim() === date.trim()
            ) {
                flagCount = childData.flagCount;
            }
        })
        return flagCount;
    })
}

export function flaggedUserList(headline, date, username) {
    const dbRef = ref(db, 'community/posts');

    let postFound = false; // Variable to track if the post was found

    return get(dbRef).then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();
            if (
                childData.Headline.trim() === headline.trim() &&
                childData.Username.trim() === username.trim() &&
                childData.date.trim() === date.trim()
            ) {
                postFound = true; // Set the variable to true
                const postKey = encodeURIComponent(childSnapshot.key);

                // Check if excludedUsers exists
                const excludedUsersExists = 'excludedUsers' in childData && childData.excludedUsers !== null;

                // Update or set excludedUsers based on its existence
                if (excludedUsersExists) {
                    const updatedExcludedUsers = childData.excludedUsers || [];
                    updatedExcludedUsers.push(username);

                    const updates = {
                        [`community/posts/${postKey}/excludedUsers`]: updatedExcludedUsers,
                    };

                    return update(ref(db), updates);
                } else {
                    const newExcludedUsers = [username];
                    return set(ref(db, `community/posts/${postKey}/excludedUsers`), newExcludedUsers);
                }
            }
        });

        // After the loop, check if the post was found
        if (!postFound) {
            // Handle the case when the post is not found
            return Promise.reject(new Error('Post not found'));
        }

        return Promise.resolve();
    });
}

export function checkExclusionList(headline, date, username) {
    const dbRef = ref(db, 'community/posts');
    var userExcluded = false;
    const currentUser = localStorage.getItem('Username');

    return get(dbRef).then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();

            if (
                childData.Headline.trim() === headline.trim() &&
                childData.Username.trim() === username.trim() &&
                childData.date.trim() === date.trim()
            ) {
                const excludedUsers = childData.excludedUsers || [];
                console.log("excluded users: ", excludedUsers, ' current username', currentUser);
                const isUserExcluded = excludedUsers.includes(currentUser);

                if (isUserExcluded) {
                    userExcluded = true;
                } 
            }
        });
        return userExcluded;
    });
}
