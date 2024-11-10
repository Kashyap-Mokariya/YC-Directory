"use client"

import { useState } from "react"
import UiverseInput from "./ui/uiverse-input"
import UiverseTextArea from "./ui/uiverse-text-area"
import MDEditor from "@uiw/react-md-editor"
import dynamic from "next/dynamic";
import SubmitButton from "./ui/submit-button"
import { Send } from "lucide-react"


const StartupForm = () => {

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [pitch, setPitch] = useState("")
  const isPending = false

  return (
    <form action={() => { }} className="startup-form">
      <div>
        <label htmlFor="title" className="startup-form_label">
          Title
        </label>
        <UiverseInput>
          <input placeholder="Startup Title" className="input mt-1.5 placeholder:text-black-300 text-[18px] text-black font-semibold" name="title" type="text" required />
        </UiverseInput >
        {errors.title &&
          <p className="startup-form_error">
            {errors.title}
          </p>}
      </div>

      <div>
        <label htmlFor="description" className="startup-form_label">
          Description
        </label>
        <UiverseTextArea>
          <textarea placeholder="Startup Description" className="input mt-1.5 placeholder:text-black-300 text-[18px] text-black font-semibold" name="desciption" required />
        </UiverseTextArea>
        {errors.desciption &&
          <p className="startup-form_error">
            {errors.desciption}
          </p>}
      </div>

      <div>
        <label htmlFor="category" className="startup-form_label">
          Category
        </label>
        <UiverseInput>
          <input placeholder="Startup Category (Tech, Esports, Education...)" className="input mt-1.5 placeholder:text-black-300 text-[18px] text-black font-semibold" name="category" type="text" required />
        </UiverseInput >
        {errors.category &&
          <p className="startup-form_error">
            {errors.category}
          </p>}
      </div>

      <div>
        <label htmlFor="link" className="startup-form_label">
          Image
        </label>
        <UiverseInput>
          <input placeholder="Startup Image URL" className="input mt-1.5 placeholder:text-black-300 text-[18px] text-black font-semibold" name="link" type="text" required />
        </UiverseInput >
        {errors.link &&
          <p className="startup-form_error">
            {errors.link}
          </p>}
      </div>

      <div data-color-mode="light">
        <label htmlFor="pitch" className="startup-form_label">
          Pitch
        </label>
        <MDEditor
          value={pitch}
          onChange={(value) => setPitch(value as string)}
          id="pitch"
          preview="edit"
          height={300}
          style={{ borderRadius: 20, overflow: "hidden", marginTop: 8 }}
          textareaProps={{
            placeholder: "Briefly Describe your idea and what problem it solves"
          }}
          previewOptions={{
            disallowedElements: ["style"]
          }}
        />
        {errors.pitch &&
          <p className="startup-form_error">
            {errors.pitch}
          </p>}
      </div>

      <div>
        <SubmitButton isPending = {isPending}>
            {isPending ? "Submitting..." : "Submit"}
            <Send className="size-6 ml-2 inline-block" />
        </SubmitButton>
      </div>
    </form>
  )
}

export default dynamic(() => Promise.resolve(StartupForm), { ssr: false })
