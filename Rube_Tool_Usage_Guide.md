# Rube Tool Usage Guide

## Introduction

Rube is a Model-Context-Protocol (MCP) server that connects AI chat tools to a wide range of business and productivity applications. It allows you to use natural language commands to interact with over 500 applications, such as Gmail, Slack, Notion, and GitHub.

## Core Workflow

To ensure reliable and accurate execution of tasks, it is crucial to follow the structured workflow provided by Rube. The core workflow consists of three main steps:

### 1. Discover with `RUBE_SEARCH_TOOLS`

This is the **first and most important step** in any workflow. Before attempting to execute any action, you must use the `RUBE_SEARCH_TOOLS` to discover the available tools for your task.

**Usage:**

Provide a clear and concise description of your use case to the `use_case` parameter.

```
RUBE_SEARCH_TOOLS(use_case="your use case here")
```

The tool will return a list of relevant tools, their descriptions, and input schemas.

### 2. Plan with `RUBE_CREATE_PLAN`

Once you have identified the necessary tools with `RUBE_SEARCH_TOOLS`, you must create a plan for their execution using `RUBE_CREATE_PLAN`. This step ensures that the workflow is logical and all necessary parameters are considered.

**Usage:**

Provide the use case, the primary tool slugs discovered in the previous step, and a reasoning for the plan.

```
RUBE_CREATE_PLAN(
    use_case="your use case here",
    primary_tool_slugs=["TOOL_SLUG_1", "TOOL_SLUG_2"],
    reasoning="Your reasoning for the plan"
)
```

### 3. Execute with `RUBE_MULTI_EXECUTE_TOOL`

After creating a plan, you can execute the tools using `RUBE_MULTI_EXECUTE_TOOL`. This tool allows for the parallel execution of multiple tools.

**Usage:**

Provide the list of tools to execute with their corresponding arguments.

```
RUBE_MULTI_EXECUTE_TOOL(
    tools=[
        {"tool_slug": "TOOL_SLUG_1", "arguments": {"arg1": "value1"}},
        {"tool_slug": "TOOL_SLUG_2", "arguments": {"arg2": "value2"}}
    ]
)
```

## Example Workflow

Let's say you want to send an email.

1.  **Discover:**

    ```
    RUBE_SEARCH_TOOLS(use_case="send an email")
    ```

    This might return a tool like `GMAIL_SEND_EMAIL`.

2.  **Plan:**

    ```
    RUBE_CREATE_PLAN(
        use_case="send an email",
        primary_tool_slugs=["GMAIL_SEND_EMAIL"],
        reasoning="To send an email using the Gmail integration."
    )
    ```

3.  **Execute:**
    ```
    RUBE_MULTI_EXECUTE_TOOL(
        tools=[
            {
                "tool_slug": "GMAIL_SEND_EMAIL",
                "arguments": {
                    "to": "recipient@example.com",
                    "subject": "Hello",
                    "body": "This is a test email."
                }
            }
        ]
    )
    ```

## Common Mistakes

A common mistake is to try to call a tool directly without first using `RUBE_SEARCH_TOOLS` to discover it and `RUBE_CREATE_PLAN` to create a plan. This can lead to errors and failed executions, as the tool might not be available or the correct parameters might not be known. **Always follow the Discover, Plan, Execute workflow.**
