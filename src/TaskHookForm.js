import React from "react";
import { useForm } from "react-hook-form"
import { nanoid } from "nanoid";

export default function TaskHookForm({ kisiler, submitFn }) {
  const {register,handleSubmit, formState:{errors, isValid}} = useForm({
    mode: "onChange",
    defaultValues:{
      title: "",
      description: "",
      people: [],
    }
  })

  // task ekleme
  function handleOnSubmit(formData) {
    submitFn({
      ...formData,
      id: nanoid(5),
      status: "yapılacak",
    });
  }

  return (
    <form className="taskForm" onSubmit={handleSubmit(handleOnSubmit)}>
      <div className="form-line">
        <label className="input-label" htmlFor="title">
          Başlık
        </label>
        <input
          className="input-text"
          id="title"
          type="text"
          {...register("title", {
                        required:"Task başlığı yazmalısınız", 
                        minLength: {
                          value: 3,
                          message:"Task başlığı en az 3 karakter olmalı"}
                      })}
          />
          {errors.title && <p className="input-error">{errors.title.message}</p>}
        
      </div>

      <div className="form-line">
        <label className="input-label" htmlFor="description">
          Açıklama
        </label>
        <textarea
          className="input-textarea"
          rows="3"
          id="description"
          {...register("description", {
            required:"Task açıklaması yazmalısınız", 
            minLength: {
              value: 10,
              message:"Task açıklaması en az 10 karakter olmalı"}
          })}
        ></textarea>
        {errors.description && <p className="input-error">{errors.description.message}</p>}
      </div>

      <div className="form-line">
        <label className="input-label">İnsanlar</label>
        <div>
          {kisiler.map((p) => (
            <label className="input-checkbox" key={p}>
              <input
                type="checkbox"
                value={p}
                {...register("people", {
                 validate: val=> {
                  if(val.length<1) {
                    return "Lütfen en az bir kişi seçin"
                  }else if(val.length>3) {
                    return "En fazla 3 kişi seçebilirsiniz"
                  } 
                  
                 }
                })}
              />
              {p}
            </label>
          ))}
        </div>
        {errors.people && <p className="input-error">{errors.people.message}</p>}
      </div>

      <div className="form-line">
        <button
          className="submit-button"
          type="submit"
          disabled={!isValid}
        >
          Kaydet
        </button>
      </div>
    </form>
      )
}
