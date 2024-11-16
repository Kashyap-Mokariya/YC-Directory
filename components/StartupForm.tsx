"use client"

import { useState, useActionState } from "react"
import UiverseInput from "./ui/uiverse-input"
import UiverseTextArea from "./ui/uiverse-text-area"
import MDEditor from "@uiw/react-md-editor"
import dynamic from "next/dynamic";
import SubmitButton from "./ui/submit-button"
import { Send } from "lucide-react"
import { formSchema } from "@/lib/validation"
import { z } from 'zod'
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { createPitch } from "@/lib/actions"

const StartupForm = () => {

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [pitch, setPitch] = useState("")
  const { toast } = useToast()
  const router = useRouter()

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        category: formData.get('category') as string,
        link: formData.get('link') as string,
        pitch
      }

      await formSchema.parseAsync(formValues)

      console.log("Form Values : ", formValues)

      const result = await createPitch(prevState, formData, pitch)

      console.log("Result: ", result)

      if (result.status === 'SUCCESS') {
        toast({
          title: "Success",
          description: "Your startup pitch has been created successfully",
        })
        router.push(`/startup/${result._id}`)
      }

      return result
    }
    catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors

        setErrors(fieldErrors as unknown as Record<string, string>)

        toast({
          title: "Error",
          description: "Please check your inputs and try again",
          variant: "destructive"
        })

        return {
          ...prevState,
          error: "Validation failed",
          status: "ERROR"
        }
      }

      toast({
        title: "Error",
        description: "An unexpected error occured",
        variant: "destructive"
      })

      return {
        ...prevState,
        error: "An unexpected error occured",
        status: "ERROR"
      }
    }
  }

  const [state, formAction, isPending] = useActionState(handleFormSubmit,
    {
      error: "",
      status: "INITIAL",
    }
  )
  return (
    <form action={formAction} className="startup-form">
      <div>
        <label htmlFor="title" className="startup-form_label">
          Title
        </label>
        <UiverseInput>
          <input placeholder="Startup Title" className="input mt-1.5 placeholder:text-black-300 text-[18px] text-black font-semibold" name="title" id="title" type="text" required />
        </UiverseInput >
        {errors.title &&
          (<p className="startup-form_error">
            {errors.title}
          </p>)}
      </div>

      <div>
        <label htmlFor="description" className="startup-form_label">
          Description
        </label>
        <UiverseTextArea>
          <textarea placeholder="Startup Description" className="input mt-1.5 placeholder:text-black-300 text-[18px] text-black font-semibold" name="description" id="description" required />
        </UiverseTextArea>
        {errors.description &&
          (<p className="startup-form_error">
            {errors.description}
          </p>)}
      </div>

      <div>
        <label htmlFor="category" className="startup-form_label">
          Category
        </label>
        <UiverseInput>
          <input placeholder="Startup Category (Tech, Esports, Education...)" className="input mt-1.5 placeholder:text-black-300 text-[18px] text-black font-semibold" name="category" id="category" type="text" required />
        </UiverseInput >
        {errors.category &&
          (<p className="startup-form_error">
            {errors.category}
          </p>)}
      </div>

      <div>
        <label htmlFor="link" className="startup-form_label">
          Image
        </label>
        <UiverseInput>
          <input placeholder="Startup Image URL" className="input mt-1.5 placeholder:text-black-300 text-[18px] text-black font-semibold" name="link" id="link" type="text" required />
        </UiverseInput >
        {errors.link &&
          (<p className="startup-form_error">
            {errors.link}
          </p>)}
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
          style={{ borderRadius: 20, overflow: "hidden", marginTop: 8, width: 600 }}
          textareaProps={{
            placeholder: "Briefly Describe your idea and what problem it solves"
          }}
          previewOptions={{
            disallowedElements: ["style"]
          }}
        />
        {errors.pitch &&
          (<p className="startup-form_error">
            {errors.pitch}
          </p>)}
      </div>

      <SubmitButton isPending={isPending}>
        <Send className="size-6 ml-2 inline-block" />
      </SubmitButton>
    </form>
  )
}

// export default StartupForm

export default dynamic(() => Promise.resolve(StartupForm), { ssr: false })

// "use client";

// import React, { useState, useActionState } from "react";
// import { Input } from "./ui/input";
// import { Button } from "./ui/button";
// import MDEditor from "@uiw/react-md-editor"
// import { Textarea } from "./ui/textarea";
// import { Send } from "lucide-react";
// import { formSchema } from "@/lib/validation";

// const StartupForm = () => {
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [pitch, setPitch] = useState("");

//   const handleFormSubmit = async (prevState: any, formData: FormData) => {
//     try {
//       const formValues = {
//         title: formData.get("title") as string,
//         description: formData.get("description") as string,
//         category: formData.get("category") as string,
//         link: formData.get("link") as string,
//         pitch,
//       };

//       console.log(formValues);

//       await formSchema.parseAsync(formValues);
//       console.log(formValues)
//     } catch (error) {

//     } finally {

//     }
//   }

//   const [state, formAction, isPending] = useActionState(handleFormSubmit, {
//     error: "",
//     status: "INITIAL",
//   });

//   return (
//     <form action={() => { }} className="startup-form">
//       <div>
//         <label htmlFor="title" className="startup-form_label">
//           Title
//         </label>
//         <Input
//           id="title"
//           name="title"
//           className="startup-form_input"
//           required
//           placeholder="Startup Title"
//         />

//         {errors.title && <p className="startup-form_error">{errors.title}</p>}
//       </div>

//       <div>
//         <label htmlFor="description" className="startup-form_label">
//           Description
//         </label>
//         <Textarea
//           id="description"
//           name="description"
//           className="startup-form_textarea"
//           required
//           placeholder="Startup Description"
//         />

//         {errors.description && (
//           <p className="startup-form_error">{errors.description}</p>
//         )}
//       </div>

//       <div>
//         <label htmlFor="category" className="startup-form_label">
//           Category
//         </label>
//         <Input
//           id="category"
//           name="category"
//           className="startup-form_input"
//           required
//           placeholder="Startup Category (Tech, Health, Education...)"
//         />

//         {errors.category && (
//           <p className="startup-form_error">{errors.category}</p>
//         )}
//       </div>

//       <div>
//         <label htmlFor="link" className="startup-form_label">
//           Image URL
//         </label>
//         <Input
//           id="link"
//           name="link"
//           className="startup-form_input"
//           required
//           placeholder="Startup Image URL"
//         />

//         {errors.link && (<p className="startup-form_error">{errors.link}</p>)}
//       </div>

//       <div data-color-mode="light">
//         <label htmlFor="pitch" className="startup-form_label">
//           Pitch
//         </label>

//         <MDEditor
//           value={pitch}
//           onChange={(value) => setPitch(value as string)}
//           id="pitch"
//           preview="edit"
//           height={300}
//           style={{ borderRadius: 20, overflow: "hidden" }}
//           textareaProps={{
//             placeholder:
//               "Briefly describe your idea and what problem it solves",
//           }}
//           previewOptions={{
//             disallowedElements: ["style"],
//           }}
//         />

//         {errors.pitch && (<p className="startup-form_error">{errors.pitch}</p>)}
//       </div>

//       <Button
//         type="submit"
//         className="startup-form_btn text-white"
//         disabled={isPending}
//       >
//         {isPending ? "Submitting..." : "Submit Your Pitch"}
//         <Send className="size-6 ml-2" />
//       </Button>
//     </form>
//   )

// };

// export default StartupForm;
