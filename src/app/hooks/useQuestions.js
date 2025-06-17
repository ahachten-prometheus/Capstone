import { surveyQuestions } from '@/data/questions';
import { useState, useEffect } from 'react';

export function useQuestion(value, next) {
  useEffect(() => {
    console.log(value)
  }, [value])
}