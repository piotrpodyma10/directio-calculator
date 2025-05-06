import { useState } from 'react'
import { TextField, Button, Typography, Box } from '@mui/material'
import { calculate } from '../../utils/operations'
import './App.css'

export default function App() {
  const [input, setInput] = useState<string>('')
  const [result, setResult] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const isValid = /\d+(\.\d+)?\s*[+\-*/]\s*\d+(\.\d+)?/.test(input)
  const allowedCharsRegex = /^[0-9+\-*/().\s.]*$/

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (allowedCharsRegex.test(value)) {
      return setInput(value)
    }
  }

  const handleCalculate = () => {
    try {
      const rawValue = calculate(input)
      const roundedValue = parseFloat(rawValue.toFixed(10))
      setResult(roundedValue)
      setError(null)
    } catch (e) {
      setError('Invalid expression')
      setResult(null)
    }
  }

  return (
    <Box className='app-container'>
      {result !== null && (
        <Typography
          variant='h5'
          color='primary'
        >
          Result: {result}
        </Typography>
      )}
      {error && (
        <Typography
          variant='h6'
          color='error'
        >
          {error}
        </Typography>
      )}
      <TextField
        className='expression-input'
        label='Expression'
        value={input}
        onChange={handleInputChange}
        fullWidth
      />
      <Button
        variant='contained'
        onClick={handleCalculate}
        disabled={!isValid}
      >
        Calculate
      </Button>
    </Box>
  )
}
