export const useQuiz = () => {
    const userPhone = useState('userPhone', () => '')
    const selectedCoupon = useState('selectedCoupon', () => null)
    const quizScore = useState('quizScore', () => 0)

    // New persistent stats
    const totalEarnings = useState('totalEarnings', () => 0)
    const totalPoints = useState('totalPoints', () => 0)
    const gamesPlayed = useState('gamesPlayed', () => 0)

    // Coupons data
    const coupons = [
        { id: 1, price: 100, prize: 1000, color: 'primary' },
        { id: 2, price: 250, prize: 2500, color: 'primary' },
        { id: 3, price: 500, prize: 5000, color: 'primary' }
    ]

    const setUserPhone = (phone: string) => {
        userPhone.value = phone
    }

    const selectCoupon = (coupon: any) => {
        selectedCoupon.value = coupon
    }

    const setScore = (score: number) => {
        quizScore.value = score
    }

    const registerWin = (amount: number) => {
        totalEarnings.value += amount
        gamesPlayed.value++
    }

    const registerLoss = () => {
        totalPoints.value += 10
        gamesPlayed.value++
    }

    const resetQuiz = () => {
        selectedCoupon.value = null
        quizScore.value = 0
    }

    return {
        userPhone,
        selectedCoupon,
        quizScore,
        totalEarnings,
        totalPoints,
        gamesPlayed,
        coupons,
        setUserPhone,
        selectCoupon,
        setScore,
        registerWin,
        registerLoss,
        resetQuiz
    }
}
