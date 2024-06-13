class CustomDate {
    static getDaysInMonth(month, year) {
        // No need to adjust the month; it should be 0-index based.
        const date = new Date(year, month, 1);
        const days = [];

        while (date.getMonth() === month) {
            days.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }

        return days;
    }


    static getWeekDaysName(date) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[date.getDay()];
    }

    static getMonthName(month) {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return months[month]; // Assuming month is 0-index based when this method is called.
    }

    static getMonthAndYear() {
        const date = new Date();
        return {
            month: date.getMonth(),
            year: date.getFullYear()
        }
    }

    /**
     * The function generates a custom made date text based on the date string provided
     * Th function returns the date in the format "Just now", "x minutes ago", "x hours ago", "x days ago" or "YYYY-MM-DD"
     * @param {string} dateString : Date string in the format "YYYY-MM-DD HH:MM:SS"
     * @returns Custom made date text : 
     * 1. "Just now" if the date is less than 1 minute ago
     * 2. "x minutes ago" if the date is less than 1 hour ago
     * 3. "x hours ago" if the date is less than 1 day ago
     * 4. "x days ago" if the date is less than 1 week ago
     * 5. "YYYY-MM-DD" if the date is more than 1 week ago
     * @example
     * const date = "2021-09-01 12:00:00";
     * const customDateText = CustomDate.generateCustomeMadeDateText(date);
     * // returns "Just now" or "x minutes ago" or "x hours ago" or "x days ago" or "YYYY-MM-DD"
     * 
     * @example
     * const date = "2021-09-01 12:00:00";
     * const customDateText = CustomDate.generateCustomeMadeDateText(date);
     * // returns "Just now" or "x minutes ago" or "x hours ago" or "x days ago" or "YYYY-MM-DD"
     */
    static generateCustomeMadeDateText(dateString) {
        const currentDate = new Date();
        const date = new Date(dateString);
        const diff = currentDate - date;
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);

        switch (true) { // Using switch statement to avoid multiple if-else statements
            case (seconds < 60):
                return "Just now";
            case (minutes < 60):
                return `${minutes} minutes ago`;
            case (hours < 24):
                return `${hours} hours ago`;
            case (days < 7):
                return `${days} days ago`;
            default:
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const day = date.getDate().toString().padStart(2, '0');
                return `${date.getFullYear()}-${month}-${day}`;
        }
    }

    /**
     * Checks if the venue is open now based on the open hours provided and the current time of the day
     * @param {string} openHours : The open hours of the venue in the format "HH - HH"
     * @returns {string} : true if the current time is between the open hours, false otherwise
     * 
     * @example
     * const openHours = "08 - 17";
     * const isOpen = CustomDate.isOpenNow(openHours);
     * // returns true if the current time is between 08 and 17, false otherwise
     * 
     */
    static isOpenNow(openHours) {
        // the openHours is string in the format HH - HH
        const [open, close] = openHours.split("-");
        // take the current time, 
        const currentDate = new Date();
        // if the current time is between the open and close time, return "Open"
        const currentHour = currentDate.getHours();

        if (currentHour >= parseInt(open) && currentHour < parseInt(close)) {
            return "Open Now";
        }
        // if closed, check if it is before 00:00 or after 00:00 
        // if the current time is between closed time and 00:00 return "opens tomorrow at 10AM" else return "Opens at 10AM"
        if (currentHour >= parseInt(close) && currentHour < 24) {
            return `Opens tomorrow at ${open}AM`;
        } else {
            return `Opens at ${open}AM`;
        }
    }

}

export default CustomDate;